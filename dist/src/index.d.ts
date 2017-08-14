export declare class FakeServer {
    routes: Array<any>;
    callCount: number;
    called: boolean;
    logger: boolean;
    router: any;
    port: number;
    constructor(port: number, logger: boolean);
    ceateManyRoutes(): void;
    createSingleRoute(pathOrRegex: any, method: any, response: any, condition: any, responseError: any): void;
    initializeRoutes(): void;
    start(): void;
}
