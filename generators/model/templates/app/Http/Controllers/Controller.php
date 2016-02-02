<?php

namespace <%- namespace %>\Http\Controllers;

use Illuminate\Http\Request;
use <%- namespace %>\Http\Requests;
use <%- namespace %>\Http\Controllers\Controller;

use <%- namespace %>\<%- model %>;
use <%- namespace %>\Repositories\<%- model %>Repository;

class <%- model %>Controller extends Controller
{
     private $repository;
     private $request;

     public function __construct( <%- model %>Repository $repository, 
		Request $request ){
        $this->repository = $repository;
	$this->request = $request;	
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view( '<%- model.toLowerCase() %>.index', 
		   [ 'dataCollection'
		       => $this->repository->getAll() ] );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    return view('forms.create_form', [
        'subview'=>'add_<%- model.toLowerCase() %>',
        'title' => 'Add new <%- model %>'
      ]); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
    $newEvent = factory(<%- model %>::class)
      ->create($this->request->except(['submit']));
    
    return back()->with('status', '<%- model %> added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
	return view( '<%- model.toLowerCase() %>.show', 
		   [ '<%- model.toLowerCase() %>' 
		      => $this->repository->getOne($id) ] );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
	$newEvent = factory(<%- model %>::class)
	->create($this->request->except(['submit']));
    
    	return back()->with('status', '<%- model %> added!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
