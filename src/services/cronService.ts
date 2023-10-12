import { Task } from "../models";

var cron = require('node-cron');

cron.schedule('55 23 * * *', async () => {
//   console.log('running a task every minute');
  const tasks = await Task.find({autoCreate: 'true'});
  const newTask = tasks.map((task:any) => {
    var date = new Date()
    const t = task.toJSON();
    delete t._id;
    delete t.__v;
    date.setDate(date.getDate() + 1)
    return {...t, taskDate: date,autoCreate: 'false',  image2 : t.image2.replace(`${process.env.SERVER_URL}/`, ""), image1 : t.image1.replace(`${process.env.SERVER_URL}/`, "")}
  })
  //console.log('newTask',newTask);
  const createdTasks = await Task.insertMany(newTask);
//console.log('createdTasks',createdTasks);
});