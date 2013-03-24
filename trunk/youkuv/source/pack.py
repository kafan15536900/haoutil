from bbfreeze import Freezer

f = Freezer('youkuv', excludes=('twisted',))
f.addScript("youkuv.py")
f()
