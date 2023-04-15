// TODO create custom ts declaration of module
import { loremPicsum } from 'lorem-picsum';
import * as client from 'https';

// TODO fix lorem-picsum forbidden response
exports.getLoremPicsumImage = (settings: any): Promise<string | undefined> => {
    settings = settings || { width: 100, height: 100, random: true };
    const randomUserPhotoUrl = loremPicsum(settings);
    return new Promise((resolve, reject) => {
        client.get(randomUserPhotoUrl, (res) => {
            if (res.statusCode === 200) {
                resolve(res.url);
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}