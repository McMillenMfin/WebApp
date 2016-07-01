var express         = require('express'),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    methodOverride  = require("method-override"),
    Plan            = require("./models/plan"),
    Member          = require("./models/member"),
    app     = express();
    
// mongoose.connect('mongodb://localhost/plan_app');
mongoose.connect('mongodb://tonymontaro:anthonidas12@ds021434.mlab.com:21434/twirlz_plan_app');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'));


//Plan routes
app.get('/', function(req, res){
    Plan.find({}, function(err, plans){
        if(err){console.log(err)}else{
            res.render('index', {plans: plans});
        }
    })
    
});
app.post('/', function(req, res){
    Plan.create(req.body.plan, function(err, plan){
        if(err){console.log(err); res.redirect('/')}else{
            res.redirect('/');
        }
    });
});

app.get('/:id/participants', function(req, res){
    
    Plan.findById(req.params.id).populate('members').exec(function(err, plan){
        if(err){console.log(err); res.redirect('/')}else{
            res.render('members', {plan:plan});
        }
    });
});

//view routes
app.get('/view', function(req, res){
    res.redirect('/5769f230b7a49b350ff75ef6');
});
app.get('/:id', function(req, res){
    Plan.findById(req.params.id).populate('members').exec(function(err, plan){
        if(err){console.log(err); res.redirect('/')}else{
            res.render('view', {plan: plan});
        }
    });
});


//members add
app.get('/:id/member', function(req, res){
   Plan.findById(req.params.id, function(err, plan){
       if(err){console.log(err); res.redirect('/')}else{
          res.render("participant", {plan: plan});
       }
   });
});
app.post('/:id/member', function(req, res){
    Plan.findById(req.params.id, function(err, plan){
        if(err){console.log(err); res.redirect('/')}else{
            Member.create(req.body.member, function(err, member){
               if(err){console.log(err); res.redirect('/')}else{
                   plan.members.push(member);
                   plan.primary = plan.members[0];
                   plan.save();
                   res.redirect('/' + req.params.id);
               }          
            });
        }
    });
});

//DELETE member
app.delete('/:id/participants/:p_id', function(req, res){
  Member.findByIdAndRemove(req.params.p_id, function(err){
      if(err){console.log(err); res.redirect('/')}else{
          res.redirect('/' + req.params.id);
      }
  });
});

//edit member
app.get('/:id/:member_id/edit', function(req, res){
    Plan.findById(req.params.id, function(err, plan){
        if(err){
          console.log(err); res.redirect('/' + req.params.id);
          }else{
             Member.findById(req.params.member_id, function(err, member){
              if(err){
                  console.log(err); res.redirect('/');
              }else{
                  res.render('edit',  {plan: plan, member: member});
              }
           });
          }
    });
});
app.put('/:id/:member_id', function(req, res){
    Member.findByIdAndUpdate(req.params.member_id, req.body.member, function(err){
        if(err){
            console.log(err);
        }
    });
    res.redirect('/' + req.params.id);
})

app.listen(process.env.PORT, process.env.IP, function(){console.log('planapp server started...')});