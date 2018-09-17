module MdSimpleEditor
  module Rails
    module MdHelper
      def markdown_editor(form, field, klass = '', options = {})
        default_options = { show_titles: true }
        render partial: 'md_simple_editor/editor_tool_bar', locals: { form: form, field: field, options: default_options.merge(options) }
      end
    end
  end
end