class CommentsController < ApplicationController

  def index
    @comments = unless params[:q]
                  Comment.all
                else
                  Comment.where('content like ?', "%#{params[:q]}%")
                end
  end

  def create
    @comment = Comment.new(content: params[:comment])
    @comment.save
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
  end

  def edit
    @comment = Comment.find(params[:id])
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.content = params[:comment]
    @comment.save

  end

end
