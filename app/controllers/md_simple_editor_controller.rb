class MdSimpleEditorController < ApplicationController
	protect_from_forgery with: :null_session
	respond_to :html

	def preview
		options = { autolink: true, space_after_headers: true, fenced_code_blocks: true }
		@html = Redcarpet::Markdown.new(MarkdownRendererWithSpecialLinks, options).render(params['md'])
		render 'md_simple_editor/preview', layout: false
	end

	def add_video_link_modal
		render 'md_simple_editor/add_video_link', layout: false
	end

	def add_midia_link
		@partial = params[:midia_class].downcase.pluralize + '/modal_form'
		@resource = params[:midia_class].constantize.new
		render 'md_simple_editor/add_midia_link', layout: false
	end
end
