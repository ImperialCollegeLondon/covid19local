$(function() {
  $(document.body).append(`
  <div class="modal fade" id="limitationsModal" tabindex="-1" role="dialog" aria-labelledby="limitationsModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="limitationsModalLabel">Limitations</h4>
      </div>
      <div class="modal-body">
        <ul>
          <li> Predictions on this page assume  no interventions (lockdowns, school closures, and others) in the local area beyond those already taken about a week before the end of observations. 
          <li>
            An increase in  cases in an area can be due to an increase in testing. The model currently does not account for this. 
          </li>
          <li>
            Each region (Local authority) is treated independently, i.e., epidemic in a region is neither affected by nor affects any other region.
          </li>
          <li>
            The population within a local authority is considered to be homogeneous, i.e., all individuals are considered equally likely to be affected by the disease progression.
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  `);
  
  
    $('#limitationsModal').modal();
});
