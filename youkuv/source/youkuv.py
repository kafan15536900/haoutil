'''
Created on 2012-12-8

@author: Harv
'''

from urllib2 import urlopen
import BaseHTTPServer

class youkuvHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=UTF-8')

        if self.path == '/crossdomain.xml':
            self.send_header('Content-Type', 'text/xml')
            content = '<?xml version="1.0" encoding="UTF-8"?><cross-domain-policy><allow-access-from domain = "*"/></cross-domain-policy>'
        elif 'getPlayList' in self.path:
            content = urlopen('http://v.youku.com' + self.path).read()
        elif self.path.endswith('.swf'):
            self.send_header('Content-Type', 'application/x-shockwave-flash')
            if 'player' in self.path:
                path = '/player.swf'
            else:
                path = self.path
            print path
            content = open('player/' + path, 'rb').read()
        else:
            content = '<b>YoukuV!</b>'
        self.end_headers()
        self.wfile.write(content)
        self.wfile.close()


address = '127.0.0.1'
port = 8008
httpd = BaseHTTPServer.HTTPServer((address, port), youkuvHandler)
print 'Server at ' + address + ':' + str(port) + ' ...'
httpd.serve_forever()
