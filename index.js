var EventEmitter = require('events').EventEmitter;
var OSinfo = require('./modules/OSInfo');

var emitter = new EventEmitter();
emitter.one('beforeCommand', function (instruction) {
    console.log('You wrote: ' + instruction + ', trying to run command')
});
emitter.on('afterCommand', function () {
    console.log('Finished command');
});

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function () {
    var input = process.stdin.read();
    if (input !== null) {
        var instruction = input.toString().trim();

        emitter.emit('beforeCommand', instruction);
        switch (instruction) {
            case '/exit':
                process.stdout.write('Quitting app!\n');
                process.exit();
                break;

            case '/version':
                process.stdout.write('Your node.js version is: ' + process.versions.node) + '\n';
                break;

            case 'language':
                process.stdout.write('Your language is: ' + process.env.lang) + '\n';
                break;

            case '/getOSinfo':
                OSinfo.print();
                break;

            default:
                process.stderr.write('Wrong instruction!\n');
        }
        emitter.emit('afterCommand');
    }
});