function submitForm() {

  record_array = [];
  var formData = {};

  var form = FormApp.openById('1KKlLXKOKjAl-wqrvsHZXVMvL-zDecjTu27jvdK8Hx84');  // Form ID
  var formResponses = form.getResponses();
  var lastResponse = formResponses.length;
  var formTitle = form.getTitle();

  var formResponse = formResponses[lastResponse - 1];
  var itemResponses = formResponse.getItemResponses();

  for (var j = 0; j < itemResponses.length; j++) {
    var itemResponse = itemResponses[j];
    var title = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();

    Logger.log(title);
    Logger.log(answer);

    formData[title]= answer;

    record_array.push(answer);
    var jsonData = JSON.stringify(formData)
  }

  //MailApp.sendEmail("duy.tran190302@hcmut.edu.vn",  // Email Address
  MailApp.sendEmail("Ngocduy190302@outlook.com.vn",
                  "Response - " + formTitle,
                  "From Name - " + record_array + "        " + jsonData
                  );

    // Gửi dữ liệu form sử dụng API (thay thế bằng API endpoint của bạn)

    var apiUrl ="https://equipmentmanagementapi.azurewebsites.net/api/Notifications";
    //var apiUrl = "https://localhost:7173/api/Notifications";
    var options = {
        method: "POST",
        contentType: "application/json",
        payload: JSON.stringify(formData)
    };
var response = UrlFetchApp.fetch(apiUrl, options);
}