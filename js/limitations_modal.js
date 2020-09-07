$(function() {
  $(document.body).append(`
  <div class="modal fade" id="limitationsModal" tabindex="-1" role="dialog" aria-labelledby="limitationsModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="limitationsModalLabel">COVID-19 local predictions for Great Britain</h4>
      </div>
      <div class="modal-body">
        <ul>
         <li> This site give estimates of the reproduction number of COVID-19 and predictions of cases by Local Authority in Great Britain based on testing data and mortality data.
         <li> All estimates and predictions have uncertainty/probability measures associated with them. Central estimates should be treated cautiously: look at the range.
          <li> Predictions of cases assume that <strong>interventions (lockdowns, school closures, and others) do not change</strong> from about a week before the end of observations to the end of the prediction period. 
          <li>
            An increase in cases in an area can be due to an increase in testing. The model currently does not account for this.
          </li>
          <li> A statistical model is used to estimate the reproduction number R, as it cannot be directly measured. This drives our forecasts. No model is perfect; see <strong>limitations</strong> in "Details".
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
