const express = require('express');
const axios = require('axios');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const uuid = require('uuid');
const FormData = require('form-data');
const stream = require('stream'); 
require('dotenv').config();



const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    credentials: {
      client_email: process.env.GCLOUD_CLIENT_EMAIL,
      private_key: process.env.GCLOUD_PRIVATE_KEY
    }
  });

const bucket = storage.bucket(process.env.GCS_BUCKET);

const uuidv1 = uuid.v1;

class Predict {
    static async predictMain (req,res){
        if (!req.file) {
            return res.status(400).json({
              status: 'fail',
              message: 'No image part',
            });
          }
          const ext = path.extname(req.file.originalname).toLowerCase();
          if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
            return res.status(400).json({
              status: 'fail',
              message: 'Hanya dapat menggunakan file gambar (.png, .jpg, .jpeg)',
            });
          }

          const newFilename = `${uuidv1()}-${req.file.originalname}`;
          const blob = bucket.file(`static/uploads/${newFilename}`);
          const blobStream = blob.createWriteStream();
        
          blobStream.on('error', (error) => {
            return res.status(400).json({
              status: 'fail',
              message: error.message,
            });
          });

          blobStream.on('finish', async () => {
            const filename = blob.name.replace('static/uploads/', '');
        
            try {
                const formData = new FormData();
                const bufferStream = new stream.PassThrough();
                bufferStream.end(req.file.buffer);
        
                
                formData.append('image', bufferStream, {
                    filename: req.file.originalname,
                    contentType: req.file.mimetype,
                });
        
               
                const response = await axios.post(process.env.API_PREDICT_HOST, formData, {
                    headers: {
                        ...formData.getHeaders(),
                    },
                });
        
                res.json(response.data);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({
                    status: 'fail',
                    message: 'Internal server error',
                });
            }
        });
        
          blobStream.end(req.file.buffer);

    }
}

module.exports=Predict