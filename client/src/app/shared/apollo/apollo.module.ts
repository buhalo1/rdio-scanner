import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

export const httpLinkFactory = (httpLink: HttpLink) => {
    const href = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/';

    return {
        cache: new InMemoryCache(),
        link: split(
            ({ query }) => {
                const def = getMainDefinition(query);

                return def.kind === 'OperationDefinition' && def.operation === 'subscription';
            },

            new WebSocketLink({
                options: {
                    reconnect: true,
                },
                uri: href.replace(/^http/, 'ws') + 'graphql',
            }),

            httpLink.create({
                uri: href + 'graphql',
            }),
        ),
    };
};

@NgModule({
    imports: [
        ApolloModule,
        HttpClientModule,
        HttpLinkModule,
    ],
})
export class AppApolloModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppApolloModule,
            providers: [
                {
                    deps: [HttpLink],
                    provide: APOLLO_OPTIONS,
                    useFactory: httpLinkFactory,
                },
            ],
        };
    }
}
