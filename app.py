from __future__ import division, print_function
import sys, os, glob, re
import numpy as np
from utils import *
from PIL import Image

# Flask utils
from flask import Flask, redirect, url_for, request, render_template, send_file
from werkzeug.utils import secure_filename
from gevent.wsgi import WSGIServer

PORTRAIT_FOLDER = os.path.join('output')
# Define a flask app
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = PORTRAIT_FOLDER

count = 0

def changecount():
    global count
    if count == 0:
        count = 1
    else:
        count = 0

def returncount():
    global count
    return count

@app.route('/', methods=['GET'])
def index():
    # Main page
    print('in index function in app-new.py' , file=sys.stderr)
    return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def upload():
    print('in upload function in app-new.py', file=sys.stderr)
    if request.method == 'POST':
        # Get the file from post request

        f = request.files['file']
        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))


        name_of_image = f.filename
        f.save(file_path)

        print('file_path = ' + str(file_path))

        file_name = os.path.basename(file_path)
        file_name = os.path.splitext(file_name)[0]
        try:

            img, output_file_name = execute_portrait_mode(file_path, file_name)

            #changecount()
            print("portait_mode done!")
            if output_file_name == 'Invalid image. No human found in image. Please try with a different photo.':
                return output_file_name
            print("Saving on " + output_file_name)
            img.save(output_file_name, quality=100)
            print("saved")

            print('before return statement', file=sys.stderr)
      

            return name_of_image
          
        except Exception as e:
            print('exception = ' + str(e), file=sys.stderr)
            return 'Invalid image. No human found in image. Please try with a different photo.'

    return None

if __name__ == '__main__':
    app.run(port=5000, debug=True)

   
