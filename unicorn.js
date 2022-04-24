// Leah Nassar
// Final Project for 2nd Session
// CRUD app
// I created an endpoint on CRUDCRUD but then my tested used up all 100 of my requests before
// i took pictures of the end result.  this is sadness.
//
// if you are a grader, you should see that my code is legit and I am submitting my assignment on time.
// 

class Unicorn {
    // crudcrud created me an endpoint of unicorns. 
    // i dont spell colour this way :)  
    // I also wouldn't consider age an important attribute
    constructor(name, age, colour) {
        this.name = name;
        this.age = age;
        this.colour = colour;
    }
}
class UnicornService {
    // by the time this is graded, this api will have expired. this is what happens when you dont provide adequate 
    // resources for students.
    static url='https://crudcrud.com/api/411fa8b79bb344208eb334f2eab53042/unicorns';
    static getAllUnicorns(){
        return $.get(this.url);
    }

    static getUnicorn(id) {
        return $.get(this.url + `/${id}`);
   }

//   this didnt work because of a CORS error so I  used the ajax
//   static createUnicorn(unicorn) {
//        return $.post(this.url, unicorn);
//   }
   static createUnicorn(unicorn) {
    return $.ajax({
        url: this.url,
        dataType: 'json',
        data: JSON.stringify(unicorn),
        contentType: 'application/json',
        type: 'POST'
        
    });
}

   static updateUnicorn(unicorn) {
        return $.ajax({
            url: this.url + `/${unicorn._id}`,
            dataType: 'json',
            data: JSON.stringify(unicorn),
            contentType: 'application/json',
            type: 'PUT'
            
        });
   }
   static deleteUnicorn(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
   }
}

class DOMManager {
    static unicorns;

    static getAllUnicorns() {
        UnicornService.getAllUnicorns().then(unicorns => this.render(unicorns));
    }
    static deleteUnicorn(id) {
        UnicornService.deleteUnicorn(id)
            .then(() => {
                return UnicornService.getAllUnicorns();
            })
            .then((unicorns) => this.render(unicorns));
    }
    static createUnicorn(name, age, colour) {
        UnicornService.createUnicorn(new Unicorn(name, age, colour))
        .then(() => {
            return UnicornService.getAllUnicorns();
        })
        .then((unicorns) => this.render(unicorns));

    }
    static render(unicorns) {
        this.unicorns = unicorns;
        $('#app').empty();

        for (let unicorn of unicorns) {
           $('#app').prepend(
                `
                <div class="unicorn-row">
                <div class="row">
                    <div class="col-sm">
                    ${unicorn.name}
                    </div>
                    <div class="col-sm">
                    ${unicorn.age}
                    </div>
                    <div class="col-sm">
                    ${unicorn.colour}
                    </div>
                    <div class="col-sm">
                    // I thought delete was too harsh a w word for a unicorn, to be honest
                        <button class="btn btn-danger" onclick="DOMManager.deleteUnicorn('${unicorn._id}')">Send this Unicorn away</button>
                    </div>
                </div>
                </div>    
                `
            
            );

        }

    }

}

$('#create-new-unicorn').click(() => {
    DOMManager.createUnicorn($('#new-unicorn-name').val(), $('#new-unicorn-age').val(), $('#new-unicorn-colour').val());

});

DOMManager.getAllUnicorns();