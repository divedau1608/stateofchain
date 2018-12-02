import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
declare var EVT: any;
declare var ecc: any;

@Injectable()
export class BaseService {
    private apiCaller: any;
    public pKey: string;

    private count = 30;

    public network = {
        host: 'testnet1.everitoken.io', 
        port: 8888,                     
        protocol: 'http'
    };

    constructor() {
        this.pKey = environment.pKey;

        this.apiCaller = EVT({
            endpoint: this.network,
            keyProvider: [environment.key] // The private key provider. Here we use the private key directly. You can also pass indirect value to increse security. See below.
        });
    }

    /**
     * 
     */
    public getApiCaller() {
        return this.apiCaller;
    }

    /**
     * 
     * @param name 
     */
    async createDomain(name) {
        try {
            let response = await this.apiCaller.pushTransaction(
                { maxCharge: 10000, payer: this.pKey },
                new EVT.EvtAction("newdomain", {
                    "name": name,
                    "creator": this.pKey,
                    "issue": {
                        "name": "issue",
                        "threshold": 1,
                        "authorizers": [{
                            "ref": "[A] " + this.pKey,
                            "weight": 1
                        }]
                    },
                    "transfer": {
                        "name": "transfer",
                        "threshold": 1,
                        "authorizers": [{
                            "ref": "[G] .OWNER",
                            "weight": 1
                        }]
                    },
                    "manage": {
                        "name": "manage",
                        "threshold": 1,
                        "authorizers": [{
                            "ref": "[A] " + this.pKey,
                            "weight": 1
                        }]
                    }
                })
            );

            return response;
        } catch (error) {
            console.log(error);
        }

    }

    /**
     * 
     * @param privateKey 
     * @param prefix 
     */
    async issueNonFungibleToken(publicKey, prefix, key, val) {
        try {
            //let publicKey = EVT.EvtKey.privateToPublic(privateKey);
            let id= new Date().getTime();
            let nameToken = prefix + id;

            let res = this.apiCaller.pushTransaction(
                { maxCharge: 10000, payer: environment.pKey },
                new EVT.EvtAction("issuetoken", {
                    "domain": 'smac',
                    "names": [nameToken],
                    "owner": [
                        environment.pKey
                    ]
                }),
                new EVT.EvtAction('addmeta', {
                    "key": key,
                    "value": val,
                    "creator": "[A] " + environment.pKey
                }, 'smac', nameToken)
            );

            return res;
            // //ADD METADATA
            // await this.apiCaller.pushTransaction(
            //     { maxCharge: 10000, payer: environment.pKey }, new EVT.EvtAction('addmeta', {
            //         "key": key,
            //         "value": val,
            //         "creator": "[A] " + environment.pKey
            //     }, 'smac', nameToken));

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 
     * @param publicKey 
     */
    async getOwnedToken(publicKey) {
        try {
            let tokens = await
                this.apiCaller.getOwnedTokens(publicKey);

            return tokens;
        } catch (error) {
            console.log(error);
        }

    }

    async getToken(domain, id) {
        let token = await this.apiCaller.getToken(domain, id);
        return token;
    }
}
