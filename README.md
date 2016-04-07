# Generator Nuxeo Metamodel
[![Build Status](https://qa.nuxeo.org/jenkins/buildStatus/icon?job=tools_generator-nuxeo-meta-master)](https://qa.nuxeo.org/jenkins/job/tools_generator-nuxeo-meta-master/)
[![devDependency Status](https://img.shields.io/david/dev/nuxeo/generator-nuxeo-meta.svg?style=flat-square)](https://david-dm.org/nuxeo/generator-nuxeo-meta#info=devDependencies)

## Introduction
This project is the metamodel used by the [nuxeo/generator-nuxeo](https://github.com/nuxeo/generator-nuxeo) project, a Yeoman generator for Nuxeo. It defines what can be generated with the generator using a simple description format.

## Format description
Each folder is a generator; you can pass several generator names to the `yo nuxeo` command.

A basic field explanation can be found on the [descriptor sample file](https://github.com/nuxeo/generator-nuxeo-meta/blob/master/sample-descriptor.js).

### Descriptor dependency, ordering, skip
#### Using the Generator Inheritance
The descriptor file is handled using the `require` node module; you need to use `module.exports` to export your descriptor in a `descriptor.js` file.

A descriptor can depend from another one. For instance, an `operation` generator depends on the `default` generator, which checks if a project initialization is needed. The default value is `default`.

```
module.exports = {
  depends: 'default'
};
```

##### Using `Skip` and `Ensure` Fields
Sometimes, you can't use a generator because the target project is not suitable, or you do not want to generate something twice. You have two ways to do that:
- using the `skip` method; useful when you do not want to generate it several times. The `skip` value is a `function` where `this` is the generator.
- using the `ensure` method; useful when you'd stop the generation due to some context issues. The `skip` value is a `function` where `this` is the generator.

For instance, the `single-module` generator is skipped when there is already a `pom.xml` file.

```
module.exports = {
  skip: function() {
    return this.fs.exists('pom.xml');
  },
  ...
};
```

For instance, the `package` generator can't be executed on a single module project:

```
module.exports = {
  ensure: function() {
    return this.config['multi'];
  },
  ...
};
```

#### Using `type` Field
The `type` field is useful when you are in a `multi-module` archetype. As the main module is a `pom`; you can chose in which submodule you'd like to force the generation. If you do not use the `type` field, user can set it using the `--type` option on the generator. The default value is `core`. The submodule is automatically added to the parent `pom.xml` file if needed.

```
module.exports = {
  type: 'core',
  ...
}
```

### Configuration
Storing project configuration can be done using the `config` field; and can be read later to skip some generator; or having a default value for a parameter... And you'll be able to read them using `this.config.read('mykey')`.

```
module.exports = {
  config: {
    multi: true
  },    
  ...
}
```

### Parameters
The `params` field defines which parameters are prompted to the user. Prompting is handled by [Inquirer.js](https://github.com/SBoudrias/Inquirer.js), you can read their documentation to have a full explanation of each type.

To sum up:

```
{
 type: 'input',
 name: 'package',
 message: 'Operation package:',
 store: true,
 validate: function(value) {
   return value.split('.').length === 0 ? '' : true;
 },
 filter: function(answer) {
   return answer.replace(/\s+/g, '.');
 }
}
```

- `type`: is the type of the input `input`, `checkbox`,...
- `name`: variable name
- `message`: message displayed to help the user answering
- `validate`: function to ensure the user input is right
- `filter`: function called after the user input finished to change it

### Java classes
Define _main_ or _test_ Java classes to be generated to a `java-main`, or `java-test` field. For both, each entry is an object with a `src` and a `dest` entries. The `src` value should refer to a local file in the `classes` folder; and `dest` only to the expected filename. The `package` is handled automatically from the `package` parameter of your generator.

```
module.exports = {
  'main-java': [{
    src: "operation.java",
    dest: "{{s.camelize(operation_name)}}.java"
  }],
  'test-java': [{
    src: "test.java",
    dest: "Test{{s.camelize(operation_name)}}.java"
  }],
}
```

### Templates
All files/folders present in the `templates` folder are rendered with a simple rendering engine with parameters in its context. To template in a file path, escape it using `{{param}}`.

In the templating context, you have access to [underscore.string](https://github.com/epeli/underscore.string) to have some useful methods.

Other templates' plain files are using [ejs](https://github.com/mde/ejs/blob/master/docs/syntax.md) to be rendered; with also [underscore.string](https://github.com/epeli/underscore.string) exposed in the `s` variable.

```
 src/main/java/{{s.unpackagize(package)}}/.empty
 ctx = {
   package: 'org.nuxeo.readme'
 }
 Will create a folder: src/main/java/org/nuxeo/readme
```

### Contributions
Contributions are handled a similar way than java classes;

```
contributions: [{
  src: "operation.xml",
  dest: "{{s.dasherize(s.decapitalize(operation_name))}}-operation-contrib.xml"
}],
```

### Dependencies
Adding dependencies to the target `pom.xml` file. A dependency is described with its GAV: `<groupId>:<artifactId>[:<version>[:<extension>[:<classifier>]]]`.

It also allows to add all 'parent child modules' as project dependencies, useful for the Package project's `pom.xml`.

```
dependencies: [
  "org.nuxeo.ecm.automation:nuxeo-automation-core",
  "org.nuxeo.ecm.automation:nuxeo-automation-test:::test"
]
or
dependencies: 'inherited'
```

## Licensing
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

## About Nuxeo
Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Netflix, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris. More information is available at [www.nuxeo.com](http://www.nuxeo.com).
