# multer-zip-ipfs
To understand The multer node-zip IPFS. Helps us add files(through API(ie., no dir)) to IPFS without losing the extension while downloading.


In POE blockchain project with INFURA+IPFS+Docker, the IPFS-API node module helps us upload the contents of file uploaded through API and this created a problem while downloading because, the images, pdfs, videos, ods etc. were fine but the excel and word kind of files are downloaded as xml and zip files. 

Initially, thought of writing conditions for each problematic file but was tough and time taking. So took a lot of time and came up with the solution of uploading every file as a zip file.

Hence ended up with Multer(destination and filename) and a zipping node module node-zip followed by IPFS. 

run npm install

