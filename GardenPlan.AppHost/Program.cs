var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.GardenPlan>("api");

builder.AddViteApp("garden-plan-client", "../garden-plan-client")
    .WithReference(api)
    .WithExternalHttpEndpoints();

builder.Build().Run();
