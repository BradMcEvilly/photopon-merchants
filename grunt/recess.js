module.exports = {
	less: {
        files: {
          'src/css/app.css': [
            'src/css/less/app.less'
          ],
          'src/css/md.css': [
            'src/css/less/md.less'
          ]
        },
        options: {
          compile: true
        }
    },
    angular: {
        files: {
            'bin/merchants/admin/css/app.min.css': [
                'libs/jquery/bootstrap/dist/css/bootstrap.css',
                'src/css/md.css',
                'src/css/*.css'
            ]
        },
        options: {
            compress: true
        }
    },
    
    angulardev: {
        files: {
            'bin/merchants/admin/css/app.css': [
                'libs/jquery/bootstrap/dist/css/bootstrap.css',
                'src/css/md.css',
                'src/css/*.css'
            ]
        },
        options: {
            compress: true
        }
    },
    html: {
        files: {
            'html/css/app.min.css': [
                'libs/jquery/bootstrap/dist/css/bootstrap.css',
                'src/css/*.css'
            ]
        },
        options: {
            compress: true
        }
    }
}
