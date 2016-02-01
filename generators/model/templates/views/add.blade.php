@extends('layouts.app')
@section('content');
<div class="row">
    <div class="panel panel-success col-md-6 col-md-offset-3">
      <div class="panel-heading">Create small ad</div>
        <div class="panel-body">
          <form class="form-horizontal">
            @include('forms.add_ad')  
          </form>
        </div>a
      </div>
    </div>
  </div>
</div>
@endsection
