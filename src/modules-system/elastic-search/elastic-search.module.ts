import { Global, Module } from "@nestjs/common";
import { ElasticsearchModule } from '@nestjs/elasticsearch'


@Global()
@Module({
    imports: [
        ElasticsearchModule.register({
            node: 'https://localhost:9200', // https
            auth: {
                username: "elastic",
                password: "HwjEWt-HV6sq23dZReT="
            },
            tls: {
                rejectUnauthorized: false
            }
        }),
    ],
    exports: [ElasticsearchModule]
})

export class ElasticSearch { }