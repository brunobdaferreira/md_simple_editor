class MdSimpleEditorController < ApplicationController
	respond_to :html, :js

	def preview
		Rails.logger.debug '******************'
		Rails.logger.debug params['md']
		options = { autolink: true, space_after_headers: true, fenced_code_blocks: true }
		html = Redcarpet::Markdown.new(MarkdownRendererWithSpecialLinks, options).render(params['md']).html_safe
		render html: html
	end

	def add_video_link_modal
		render 'md_simple_editor/add_video_link', layout: false
	end

	def add_video_link

	end
end
