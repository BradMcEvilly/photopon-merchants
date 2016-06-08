{% extends "tpl/layout.tpl" %}

{% block content %}




    <div class="bg-white-only">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 text-center">
            <div class="m-t-xxl m-b-xxl padder-v">
              <h1 class="font-bold l-h-1x m-t-xxl text-black padder-v animated fadeInDown">
                Empower your business with Photopon.
              </h1>
              <h3 id="requestsenttext" class="hidden text-muted m-t-xl l-h-1x" style="color: #00bb88;"><strong>Your merchant request was successfully sent.</strong></h3>

              <h3 class="text-muted m-t-xl l-h-1x">Photopon allows you to make your business social. Your coupons will be available to all local Photopon users to share with thier friends and redeem. To become Photopon merchant make <strong><a href="./admin/#/access/request">request here</a></strong></h3>
            </div>

          </div>
        </div>
      </div>
    </div>


    <div class="bg-white-only">
      <div class="container">
        


        <div class="row">
          
          <div class="col-sm-offset-2 col-sm-4 wrapper-xl">
            <div class="coverpic pic2"></div>
          </div>

          <div class="col-sm-6 wrapper-xl">
            <h3 class="text-black font-bold">
              <i class="glyphicon glyphicon-ok-sign icon text-info-dker"></i>
              Request merchant access</h3>
              <p class="h4 l-h-1x">Fill up information about your business and request access. Once your request is approved you will have access to merchants dashboard.</p>

            <h3 class="text-black font-bold">
              <i class="glyphicon glyphicon-ok-sign icon text-info-dker"></i>
              Add business locations</h3>
              <p class="h4 l-h-1x">Add locations of your business. Those locations will be used to show your coupons to users nearby users.</p>
      
            
           
            <h3 class="text-black font-bold">
              <i class="glyphicon glyphicon-ok-sign icon text-info-dker"></i>
              Add coupons</h3>
              <p class="h4 l-h-1x">Create your coupons and attach them to your business locations or make them available on all locations.</p>
            
            <h3 class="text-black font-bold">
              <i class="glyphicon glyphicon-ok-sign icon text-info-dker"></i>
              Track your redeems</h3>
            <p class="h4 l-h-1x">Track your coupon redeems and see detailed map and information of all coupon redeems.</p>
          </div>


        </div>




        <div class="row">
          <h1 class="font-bold l-h-1x m-t-xxl text-black text-center padder-v animated fadeInDown">
                How it works.
          </h1>
        </div>

        <!-- Request -->
        <div class="row">
          
          <div class="col-sm-8 wrapper-md">
            <div class="coverpic-big pic-request"></div>
          </div>

          <div class="col-sm-4 wrapper-md">
            <h3 class="text-black font-bold">Request merchant access</h3>
              <p class="h4 l-h-1x">In order to request merchant access you will need to provide following information.</p>
              <ul>
                <li>Existing Photopon account username and password</li>
                <li>Company name</li>
                <li>Phone number</li>
                <li>Tax ID</li>
                <li>Referral code (optional)</li>
                <li>Company Logo (optional)</li>
              </ul>
              <p class="h4 l-h-1x">After you submit request it will be reviewed and you will be granted access to merchants dashboard
          </div>
        </div>

        <!-- Add location -->
        <div class="row">

          <div class="col-sm-4 wrapper-md">
            <h3 class="text-black font-bold">Add Location</h3>
              <p class="h4 l-h-1x">Add all your business locations here by simply naming them and fillling up the address.</p>
          </div>
          
          <div class="col-sm-8 wrapper-md">
            <div class="coverpic-big pic-location"></div>
          </div>
        </div>


        <!-- Add Coupon -->
        <div class="row">
          
          <div class="col-sm-8 wrapper-md">
            <div class="coverpic-big pic-coupon"></div>
          </div>

          <div class="col-sm-4 wrapper-md">
            <h3 class="text-black font-bold">Add Coupon</h3>
              <p class="h4 l-h-1x">Adding coupons is easy. You need to fill up the title and full description of coupon, coupon code and expiration date. After all this information is filled up you need to choose the business location(s) where coupon is available or simply choose all locations.</p>
          </div>
        </div>

        <!-- Track Redeems -->
        <div class="row">

          <div class="col-sm-4 wrapper-md">
            <h3 class="text-black font-bold">Track Redeems</h3>
              <p class="h4 l-h-1x">Each coupon redeem is tracked in Photopon. You will get information about users who redeemed it, location where it was redeemed and information about user who sent your coupon.</p>
          </div>
          
          <div class="col-sm-8 wrapper-md">
            <div class="coverpic-big pic-stats"></div>
          </div>
        </div>

        <!-- Request -->
        <div class="row">
          
          <div class="col-sm-8 wrapper-md">
            <div class="coverpic-big pic-invoice"></div>
          </div>

          <div class="col-sm-4 wrapper-md">
            <h3 class="text-black font-bold">Invoice</h3>
              <p class="h4 l-h-1x">Photopon charges you only when user redeems your coupon through our system. You will be charged 25 cents per redeem. Invoices are generated monthly.</p>
          </div>
        </div>



      </div>
    </div>
   
{% endblock %}
