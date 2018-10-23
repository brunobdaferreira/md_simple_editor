# /lib/helpers/markdown_renderer_with_special_links.rb
class MarkdownRendererWithSpecialLinks < Redcarpet::Render::HTML
  include Rails.application.routes.url_helpers
  include ApplicationHelper
  include ActionView::Helpers::AssetTagHelper

  def image(link, _title, content)
    return render_image(link, _title, content) if respond_to?(:render_image) && numeric?(link)
    "<img alt='#{content}' class='img-fluid' src='#{link}'>"
  end

  def numeric?(value)
    !value.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/).nil?
  end

  def link(link, _title, alt_text)
    "<a target=\"_blank\" href=\"#{link}\">#{alt_text}</a>"
  end

  def autolink(link, link_type)
    case link_type
    when :url then url_link(link)
    when :email then email_link(link)
    end
  end

  def url_link(link)
    case link
    when %r{https:\/\/www.youtube} then youtube_link(link)
    else normal_link(link)
    end
  end

  def youtube_link(link)
    conteudo = "<p class='embed-responsive embed-responsive-16by9'>"
    conteudo += "<iframe width='560' height='315' src='#{link}' frameborder='0' class='embed-responsive-item' allowfullscreen></iframe>"
    conteudo += '</p>'
    conteudo
  end

  def normal_link(link)
    "<a target=\"_blank\" href=\"#{link}\">#{link}</a>"
  end

  def email_link(email)
    "<a href=\"mailto:#{email}\">#{email}</a>"
  end
end
