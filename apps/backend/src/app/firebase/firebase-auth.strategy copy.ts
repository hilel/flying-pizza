import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from "passport-jwt";
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // https://medium.com/nerd-for-tech/nestjs-firebase-auth-secured-nestjs-app-using-passport-60e654681cff
            // https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com
            secretOrKey: '-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIAmi49Vt3uskwDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAwwmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjMw\nMzE5MDkzOTIzWhcNMjMwNDA0MjE1NDIzWjAxMS8wLQYDVQQDDCZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBAIyS/4wE186zvxH/zDGjnAe2zPv0bzasduo2LvKNahiooIHR\naxgNmJnzENDG9N0iHVxZ0cebBH/XQnhVVcKynfFavQLMti19oJCir+h6e4ylL7GS\nxPBbz2twQnbnSWjxT2hs7Zwwm9IEV5BxdrWCj5VrYNs6u4MePenmLQ8/RQc6PBEQ\n2OfvWURwNfLANpOEGGpUpE7NYxooqXB2v3Itrk/DfQE3RTHF/D5SX16TnsESnywY\n0oCyNBZ639vRQrhJXDBwAw5s7zOkKwOC7btGhEAuciwj+KIq2rQ3V49sexHF4dL1\nztlnz2j93RiSgBWETvAttWJEj+T+k1JJUVGU8CkCAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAHf/Xzt6jbWu4W1BUsgbZMabV7xrENozdqHg8Rg+zfii\nYjI2MQHL1YyGT23+K6yBsBm/x1n19juaesbH1PA3tRSLSXY9shs3lNyasNmZy7er\nWW1KEizsMuAlqn65J+fAd1SivmxBjEteeU7mFWxytjw0KUUqc2Qs13w2EBTeohjn\nQF9EHs2ttYZQJUkd+ZbVUnNCV38UB+gwhp65PHw+Y1iObL4jFrGLhxrq31tn++eX\naUTW+xylRKt2S5SMzv8eRVPyezBcJoRm+pL9UvD153PO83dPM5j5lu09AOCJrmqL\ndFjiH2n5PkJFQT1akQ26N2f8AAxDMT2FQnnDi7B6PJA=\n-----END CERTIFICATE-----\n'
        });
    }

    validate(token) {
        const verifyDisabled = true;
        return auth()
            .verifyIdToken(token, verifyDisabled)
            .catch((err) => {
                console.log(err);
                throw new UnauthorizedException();
            });
    }
    // async validate(payload) {
    //     console.log(payload);
    //     const user = {
    //         user_id: payload.user_id,
    //         email: payload.email
    //     }
    //     return user;
    // }
}