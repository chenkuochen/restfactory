#!/usr/bin/python
import os
import cgi, cgitb

form = cgi.FieldStorage()

a = form.getvalue('A')
b = form.getvalue('B')

print "Content-type:application/json\r\n\r\n"
print "{\"result\":\"" + os.environ["REQUEST_METHOD"] + a + b + "\"}"
