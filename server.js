import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import {nanoid} from'nanoid';

const app=express();
app.use(express.json());
dotenv.config();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
const port = process.env.PORT

/*try {
    const response = await fetch( 'https://www.course-api.com/react-useReducer-cart-project');
    const cartData = await response.json();
    console.log(cartData);
} catch (error) {
    console.log(error);
}*/

let jobs=[
    {
        id:nanoid(),company:'apple',position:'front-end'
    },
    { id: nanoid(), company: 'google', position: 'back-end' },
];

app.get('/api/v1/jobs',(req,res)=>{
    res.status(200).json({jobs});
});
// create Job
app.post ('/api/v1/jobs', (req,res)=>{
    const {company ,position} =req.body;
    if(!company || !position){
        return res.status(400).json({msg :'please provide all info'});
    }
    const id =nanoid(10);
    const job ={id,company,position};
    jobs.push(job);
    res.status(200).json({job});
});

// GET SINGLE JOB

app.get('/api/v1/jobs/:id', (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
    res.status(200).json({ job });
  });
// EDIT JOB

app.patch('/api/v1/jobs/:id', (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
      return res.status(400).json({ msg: 'please provide company and position' });
    }
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
  
    job.company = company;
    job.position = position;
    res.status(200).json({ msg: 'job modified', job });
  });
  app.delete('/api/v1/jobs/:id', (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
    const newJobs = jobs.filter((job) => job.id !== id);
    jobs = newJobs;
  
    res.status(200).json({ msg: 'job deleted' });
  });
//GET ALL JOBS
app.get('/api/v1/jobs',(req,res)=>{
    res.status(200).json({jobs});
})
app.listen(port,()=>{
    console.log(`server running on PORT ${port}....`);
});