/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */
import '/both/collections/schemas/contracts.schema.js';

Collections.Contracts = new Mongo.Collection('ec_contracts');
Collections.Contracts.schema = Schemas.Contracts;