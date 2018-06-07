# /lib/helpers/markdown_renderer_with_special_links.rb
class MarkdownRendererWithSpecialLinks < Redcarpet::Render::HTML
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
    "<iframe width=\"560\" height=\"315\" src=\"#{link}\" frameborder=\"0\" allowfullscreen></iframe>"
  end

  def normal_link(link)
    "<a href=\"#{link}\">#{link}</a>"
  end

  def email_link(email)
    "<a href=\"mailto:#{email}\">#{email}</a>"
  end
end
