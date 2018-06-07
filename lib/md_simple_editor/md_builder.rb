class MdBuilder

  include ActionView::Helpers
  attr_accessor :class_attr, :output_buffer

  def initialize(class_attr='')
    self.class_attr = class_attr
  end

  def default_class
    "btn btn-outline-dark #{class_attr}"
  end
end