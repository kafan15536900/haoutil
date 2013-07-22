'''
Created on 2012-12-8
Modified on 2013-7-22
@author: Harv
'''

from urllib2 import urlopen
import BaseHTTPServer
import os

class youkuvHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=UTF-8')

        if self.path == '/crossdomain.xml':
            print 'Crossdomain spoofing'
            self.send_header('Content-Type', 'text/xml')
            content = '<?xml version="1.0" encoding="UTF-8"?><cross-domain-policy><allow-access-from domain = "*"/></cross-domain-policy>'
        elif 'getPlayList' in self.path:
            content = urlopen('http://v.youku.com' + self.path).read()
        elif self.path == '/':
            content = '<b>YoukuV!</b>'
        else:
            self.send_header('Content-Type', 'application/x-shockwave-flash')
            path = self.path
            print 'Request ' + path
            path = self.path.split('?')[0]
            print 'Convert to ' + path
            path = 'player' + path
            if os.path.isfile(path):
                content = open(path, 'rb').read()
            else:
                print 'No such file'
                content = ''
        self.end_headers()
        self.wfile.write(content)
        self.wfile.close()


address = '127.0.0.1'
port = 80
httpd = BaseHTTPServer.HTTPServer((address, port), youkuvHandler)
print 'Server at ' + address + ':' + str(port) + ' ...'
httpd.serve_forever()
