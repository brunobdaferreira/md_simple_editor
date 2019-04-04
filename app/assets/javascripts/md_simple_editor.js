(function() {

  adiciona_conteudo = function(textArea, texto){
    var conteudo = textArea.val() + texto;
    textArea.val(conteudo);
    textArea.focus();
  };

  preview = function(textArea) {
    $.post('/md_simple_editor/preview', {
      md: textArea.val()
    }, function(data) {
      $(data).modal('show');
    });
  };

  add_video_link = function(){
    $.get('/md_simple_editor/add_video_link_modal', function(data){
      $(data).modal('show');
    });
  };

  add_midia = function(midia_class){
    $.get('/md_simple_editor/add_midia_link/?midia_class=' + midia_class, function(data){
      $(data).modal('show');
    });
  };

  add_midia_link = function(alt, link){
    var textArea = $(document).find('.markdown-textarea');
    var conteudo = '![' + alt + ' ' + alt +'](' + link + ')';
    adiciona_conteudo(textArea, conteudo);
    $(document).find('.modal').modal('hide');
  };

  add_galery_link = function(alt, link){
    var textArea = $(document).find('.markdown-textarea');
    var conteudo = '![' + alt + ' ' + alt +'](galery:' + link + ')';
    adiciona_conteudo(textArea, conteudo);
    $(document).find('.modal').modal('hide');
  };

  $(document).on('click', '.markdown-tool', function(){
    var textArea = $(this).closest('.markdown-editor').find('.markdown-textarea');
    adiciona_conteudo(textArea, $(this).data('marker'));
    return false;
  });

  $(document).on('click', '.markdown-tool-link', function(){
    if($(this).data('marker') === 'video'){
      add_video_link();
    } else if($(this).data('marker') === 'image'){
      add_midia($(this).data('midia-class'));
    }
    return false;
  });

  $(document).on('click', '.markdown-tool-preview', function(){
    var textArea = $(this).closest('.markdown-editor').find('.markdown-textarea');
    preview(textArea);
    return false;
  });

  $(document).on('click', '.btn-add-link-video', function(){
    var id_video = $(this).closest('form').find("#video_id").val();
    if(id_video !== "") {
      var link = 'https://www.youtube.com/embed/' + id_video;
      var textArea = $(document).find('.markdown-textarea');
      adiciona_conteudo(textArea, link);
      $(this).closest('.modal').modal('hide');
    }
  });

}).call(this);