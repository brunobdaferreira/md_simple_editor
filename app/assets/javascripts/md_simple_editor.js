(function() {
  var initializeEditor, insertAtCaret, md_simple_editor, preview;

  md_simple_editor = function() {
    return $('.btn-toolbar .btn-group button').click(function() {
      var att_class, option, rgex, text, textarea;
      att_class = this.classList;
      rgex = /md_/;
      option = $.grep(att_class, function(item) {
        return rgex.test(item);
      });
      if (option.length !== 0) {
        option = option[0].toString();
        if(option === 'md_h1'){
          text = "# ";
        } else if(option === 'md_h2') {
          text = "## ";
        } else if(option === 'md_h3') {
          text = "### ";
        } else if(option === 'md_h4') {
          text = "#### ";
        } else if(option === 'md_h5') {
          text = "##### ";
        } else if(option === 'md_italic') {
          text = "_Seu texto itálico aqui_";
        } else if(option === 'md_bold') {
          text = "**Seu texto negrito aqui**";
        } else if(option === 'md_link') {
          text = "[Texto do link](Endereço do link)";
        } else if(option === 'md_camera-retro') {
          text = "\n![Alt](https://www.google.com.co/images/srpr/logo11w.png)\n";
        } else if(option === 'md_video-link') {
          text = "";
          add_video_link();
        } else {
          text = "";
        }
        textarea = $('#md-editor #md-text textarea');
        return insertAtCaret(textarea.attr('id'), text);
      }
    });
  };

  preview = function() {
    if ($('#md-text').prop('hidden')) {
      $('.preview_md').text('Preview');
      $('#md-text').removeAttr('hidden');
      $('.preview-panel').attr('hidden', 'true');
      return false;
    } else {
      return $.post('/md_simple_editor/preview', {
        md: $('#md-text textarea').val()
      }, function(data) {
        $(data).modal('show');
      });
    }
  };

  insertAtCaret = function(areaId, text) {
    var back, br, front, range, scrollPos, strPos, txtarea;
    txtarea = document.getElementById(areaId);
    scrollPos = txtarea.scrollTop;
    strPos = 0;
    br = (txtarea.selectionStart || txtarea.selectionStart === "0" ? "ff" : (document.selection ? "ie" : false));
    if (br === "ie") {
      txtarea.focus();
      range = document.selection.createRange();
      range.moveStart("character", -txtarea.value.length);
      strPos = range.text.length;
    } else {
      if (br === "ff") {
        strPos = txtarea.selectionStart;
      }
    }
    front = txtarea.value.substring(0, strPos);
    back = txtarea.value.substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br === "ie") {
      txtarea.focus();
      range = document.selection.createRange();
      range.moveStart("character", -txtarea.value.length);
      range.moveStart("character", strPos);
      range.moveEnd("character", 0);
      range.select();
    } else if (br === "ff") {
      txtarea.selectionStart = strPos;
      txtarea.selectionEnd = strPos;
      txtarea.focus();
    }
    return txtarea.scrollTop = scrollPos;
  };

  initializeEditor = function() {
    md_simple_editor();
    $(document).off('turbolinks:load page:load ready', initializeEditor);
    return $('.preview_md').click(function() {
      return preview();
    });
  };

  add_video_link = function(){
    $.get('/md_simple_editor/add_video_link_modal', function(data){
      $(data).modal('show');
    });
  };

  $(document).on('click', '.btn-add-link-video', function(){
    var id_video = $(this).closest('form').find("#video_id").val();
    if(id_video !== "") {
      var link = 'https://www.youtube.com/embed/' + id_video;
      var textareafield = $('#md-editor #md-text textarea');
      $(this).closest('.modal').modal('hide');
      return insertAtCaret(textareafield.attr('id'), link);
    }
  });

  $(document).on('turbolinks:load page:load ready', initializeEditor);

}).call(this);