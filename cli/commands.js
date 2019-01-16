module.exports = {
    app: {
        default: true,
        desc: 'Create a new JHammer application based on the selected options'
    },
    aws: {
        desc: 'Deploy the current application to Amazon Web Services'
    },
    'aws-containers': {
        desc: 'Deploy the current application to Amazon Web Services using ECS'
    },
    'ci-cd': {
        desc: 'Create pipeline scripts for popular Continuous Integration/Continuous Deployment tools'
    },
    client: {
        desc:
            'DEPRECATED: Create a new JHammer client-side application based on the selected options -  Use jhammer --skip-server instead'
    },
    cloudfoundry: {
        desc: 'Generate a `deploy/cloudfoundry` folder with a specific manifest.yml to deploy to Cloud Foundry'
    },
    'docker-compose': {
        desc: 'Create all required Docker deployment configuration for the selected applications'
    },
    entity: {
        argument: ['name'],
        desc: 'Create a new JHammer entity: JPA entity, Spring server-side components and Angular client-side components'
    },
    'export-jdl': {
        argument: ['jdlFile'],
        desc: 'Create a JDL file from the existing entities'
    },
    gae: {
        desc: 'Deploy the current application to Google App Engine'
    },
    heroku: {
        desc: 'Deploy the current application to Heroku'
    },
    'import-jdl': {
        argument: ['jdlFiles...'],
        cliOnly: true,
        desc: `Create entities from the JDL file passed in argument.
  By default everything is run in parallel. If you like to interact with the console use '--interactive' flag.`,
        help: `
    --skip-install        # Do not automatically install dependencies                              Default: false
    --interactive         # Run generation in series so that questions can be interacted with      Default: false
    --db                  # Provide DB option for the application when using skip-server flag
    --json-only           # Generate only the JSON files and skip entity regeneration              Default: false
    --ignore-application  # Ignores application generation                                         Default: false
    --ignore-deployments  # Ignores deployments generation                                         Default: false
    --skip-ui-grouping    # Disable the UI grouping behavior for entity client side code           Default: false

Arguments:
    jdlFiles  # The JDL file names  Type: String[]  Required: true

Example:
    jhammer import-jdl myfile.jdl
    jhammer import-jdl myfile.jdl --interactive
    jhammer import-jdl myfile1.jdl myfile2.jdl
        `
    },
    info: {
        desc: 'Display information about your current project and system'
    },
    kubernetes: {
        desc: 'Deploy the current application to Kubernetes'
    },
    languages: {
        argument: ['languages...'],
        desc: 'Select languages from a list of available languages. The i18n files will be copied to the /webapp/i18n folder'
    },
    // login: {
    //     desc: 'Link the installed JHammer CLI to your JHammer Online account'
    // },
    // logout: {
    //     desc: 'Unlink the installed JHammer CLI from your JHammer Online account'
    // },
    openshift: {
        desc: 'Deploy the current application to OpenShift'
    },
    'rancher-compose': {
        desc: 'Deploy the current application to Rancher'
    },
    server: {
        desc: 'DEPRECATED: Create a new JHammer server-side application - Use jhammer --skip-client instead'
    },
    'spring-service': {
        alias: 'service',
        argument: ['name'],
        desc: 'Create a new Spring service bean'
    },
    'spring-controller': {
        argument: ['name'],
        desc: 'Create a new Spring controller'
    },
    upgrade: {
        desc: 'Upgrade the JHammer version, and upgrade the generated application'
    }
};
