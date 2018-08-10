asciify = require('asciify')
module.exports = {

    
    uploadpackage: {
        cmd: function () {
            asciify('deploy!', { font: 'colossal', color: 'red' }, function(err, res){ console.log(res) });
            asciify(global.filename, { font: 'drpepper', color: 'blue'}, function(err, res){ console.log(res) });
            console.log('deploying file ' + global.filename + ' to production');
            //return "scp -rv " + global.filename + " bradmcevilly@photopon.co:/home/bradmcevilly/releases/";
            return "rsync -avzhe ssh --progress " + global.filename + " bradmcevilly@photopon.co:/home/bradmcevilly/releases/";
        }
    }





};
