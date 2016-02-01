<?php

namespace <%- namespace %>\Http\Controllers;

use Illuminate\Http\Request;

use <%- namespace %>\Http\Requests;
use <%- namespace %>\<%- model %>;
use <%- namespace %>\Http\Controllers\Controller;
use <%- namespace %>\Repositories\<%- model %>Repository;

class <%- model %>Controller extends Controller
{
	private $repo;

	public function __construct(<%- model %>Repository $repo, Request $request){
		$this->repo = $repo;	
	}

   public function index(){
		return view('<%- model.toLowerCase() %>.index', ['<%- model.toLowerCase() %>Collection' => $this->repo->getAll()]);
	}

	public function show($id){

		$<%- model.toLowerCase() %> = $this->repo->getOne($id);
		return view('<%- model.toLowerCase() %>.show', ['<%- model.toLowerCase() %>' => $<%- model.toLowerCase() %>]);
	}

  public function submit(){
    return view('forms.create_form', [
        'subview'=>'add_<%- model.toLowerCase() %>',
        'title' => 'Add new <%- model %>'
      ]); 
  }

  public function create(){
    $newEvent = factory(<%- model %>::class)
      ->create($request->except(['submit']));
    
    return back()->with('status', '<%- model %> added!');
  }

  public function update(){
    $newEvent = factory(<%- model %>::class)
      ->create($request->except(['submit']));
    
    return back()->with('status', '<%- model %> added!');
  }
}
