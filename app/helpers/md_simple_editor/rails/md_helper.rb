module MdSimpleEditor
  module Rails
    module MdHelper
      def markdown_editor(form, field, klass = '', options = {})
        render partial: 'md_simple_editor/editor_tool_bar', locals: { form: form, field: field, options: options }
      end
    end
  end
end