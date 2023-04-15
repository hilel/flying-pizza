import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { PizzasDataSource } from './pizzas-datasource';
import { EditPizzaDlgService } from './components/edit-pizza-dlg/edit-pizza-dlg.service';
import { IPizzaItem } from '@flying-pizza/model';
import { PizzaService } from '@flying-pizza/shared-services';

@Component({
  selector: 'fp-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IPizzaItem>;
  dataSource: PizzasDataSource;

  // thingsAsMatTableDataSource$: Observable<MatTableDataSource<IPizzaItem>> =
  //   this.pizza.getPizzasRef().pipe(
  //     map((pizzas) => {
  //       const dataSource = new MatTableDataSource<IPizzaItem>();
  //       dataSource.data = pizzas;
  //       this.dataSource.paginator = this.paginator;
  //       this.table.dataSource = this.dataSource;
  //       return dataSource;
  //     })
  //   );

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description', 'price', 'actions'];
  loading: boolean = false;

  constructor(private editPizzaDlg: EditPizzaDlgService, private pizza: PizzaService) {
    this.dataSource = new PizzasDataSource(this.pizza.getPizzasRef());
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  async addPizza(): Promise<void> {
    const dlgRef = await this.editPizzaDlg.openEditPizzaDlg();
    dlgRef.afterClosed().subscribe((pizzaItemResult) => {
      if (pizzaItemResult) {
        this.loading = true;
        this.pizza.createPizza(pizzaItemResult).subscribe({
          next: (resp) => {
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            console.log(err);
          }
        })
      }
    });
  }
  
  async editPizza(pizza: IPizzaItem): Promise<void> {
    const dlgRef = await this.editPizzaDlg.openEditPizzaDlg(pizza);
    dlgRef.afterClosed().subscribe((pizzaItemDlgResult) => {
      const foundIndex = this.dataSource.data.findIndex((i) => i.id === pizzaItemDlgResult?.id);
      if (foundIndex > -1) {
        this.loading = true;
        this.pizza.updatePizza(pizzaItemDlgResult as IPizzaItem).subscribe({
          next: (resp) => {
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            console.log(err);
          }
        })
      }
    });
  }
}
