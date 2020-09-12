$(function() {
  $(document.body).append(`
  <div class="modal fade" id="limitationsModal" tabindex="-1" role="dialog" aria-labelledby="limitationsModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="limitationsModalLabel">COVID-19 United Kingdom</h4>
      </div>
      <div class="modal-body">
        <ul>
         <li> This site give estimates of the reproduction number of COVID-19 and projections of cases by Local Authority in the UK based on testing data and mortality data.
         <li> All estimates and projections have uncertainty/probability measures associated with them. Central estimates should be treated cautiously: look at the range.
          <li> Projections of cases assume that <strong>interventions (e.g. lockdowns, school closures) and behaviour patterns do not change</strong> from about a week before the end of observations onwards. 
          <li>
            An increase in cases in an area can be due to an increase in testing. The model currently does not account for this.
          </li>
          <li> A statistical model is used to estimate qunatities that cannot be directly measures, such as the reproduction number R. No model is perfect; see <strong>limitations</strong> in "Details".
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="topFunction()">Close</button>
      </div>
    </div>
  </div>
</div>
  `);
  
  
    $('#limitationsModal').modal();
});
