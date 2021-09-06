import { createConnection } from "typeorm";
import { typeORMConfig } from "../../../config/connection";

createConnection(typeORMConfig);
