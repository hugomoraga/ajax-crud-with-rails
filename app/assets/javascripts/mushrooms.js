$(document).ready(function(){ 
    //list all commnets
    $('#getButton').click(function() {
      
        //fetch comments from server
        $.ajax({
            type: "GET",
            url: "/comments",
            dataType: "script"
        });
        
    })

    //create comments
    $('[type=submit]').click(function(e){
        //previene que recargue la vista
        e.preventDefault()
        //no permite comentarios en blanco
        if($('[name=create]').val() == ''){
            return false
        }
        //token para que acepte la creacion
        $.ajax({
            beforeSend: function (xhr) { 
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) 
              },
            type: "post",
            url: "/comments",
            data: { comment: $('[name=create]').val()},
            dataType: "script"
        });

    })

    //search comment
    $('[name=q]').on('keyup',function (){
        //console.log($(this).val())
        //$('h1')[0].innerHTML = $(this).val()
        if ($(this).val().length > 2){
            $.ajax({
                type: "get",
                url: "/comments",
                data: { q: $(this).val() },
                dataType: "script"
            });
        }

        if ($(this).val().length == 0){
            $.ajax({
                type: "get",
                url: "/comments",
                data: { q: $(this).val() },
                dataType: "script"
            });
        }
    })


    //delete comment
    $('ul').on('click', '.delete_comment',function(e){
        e.preventDefault()
        var id = $(this).closest('li')[0].id.split('_')[1]
        //token para que acepte la eliminacion
        $.ajax({
            beforeSend: function (xhr) { 
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) 
              },
            type: "delete",
            url: "/comments/" + id,
            dataType: "script"

        });
    })

    //edit comment
    $('ul').on('click', '.update_comment',function(e){
        e.preventDefault()
        var id = $(this).closest('li')[0].id.split('_')[1]
        $.ajax({
            type: "get",
            url: "/comments/"+id+"/edit",
            dataType: "script"
        });

    })

    //update comment
    $('#update').on('click', 'button',function(e){
        e.preventDefault()
        var content = $(this).closest('form')[0][0].value
        var id = $(this).closest('form')[0][1].value
        $.ajax({
            beforeSend: function (xhr) { 
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) 
              },
            type: "patch",
            url: "/comments/" + id,
            data: { comment: content },
            dataType: "script"
        });

    })
})