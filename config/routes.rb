Rails.application.routes.draw do
	post 'md_simple_editor/preview'
	get 'md_simple_editor/add_video_link_modal'
	post 'md_simple_editor/add_video_link'
end