import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitySchema, MixedList } from 'typeorm';

type ConnectConfig = {
  host: string;
  database: string;
  entities: MixedList<string | Function | EntitySchema<any>>;
  username: string;
  password: string;
  port: number;
};

export default ({
  host,
  database,
  entities,
  username,
  password,
  port,
}: ConnectConfig) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host,
    port,
    username,
    password,
    synchronize: true,
    autoLoadEntities: true,
    database,
    entities,
  });
