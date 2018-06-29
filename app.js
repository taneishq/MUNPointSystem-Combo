'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('pointsystem', []);
app.controller('maincontroller', function($scope, $http) {
    $scope.getcountryurl="http://localhost:5600/getcountries";
    $scope.insertDataurl="http://localhost:5600/addPoints/";
    $scope.countries=[];
    $scope.checkValidity=function(Points,Speech){
        var isValid = true;
        if (Speech=="SL"){
            if(Points <=10) {
            }else
            {
                isValid=false;
                alert("Maximum Number of Points Exceeded");
            }
        }
        if (Speech=="ModCaucus"){
            if(Points <=10){
            }else{
                isValid=false;
                alert("Maximum Number of Points Exceeded");
            }
        }
        if (Speech=="POIa"){
            if(Points <=5){
            }else{
                isValid=false;
                alert("Maximum Number of Points Exceeded");
            }
        }
        if (Speech=="POIr"){
            if(Points <=10){
            }else{
                isValid=false;
                alert("Maximum Number of Points Exceeded");
            }
        }
        if (Speech=="FPV"){
            if(Points <=10){
            }else{
                isValid=false;
                alert("Maximum Number of Points Exceeded");
            }
        }
        if (Speech=="FE"){
            if(Points <=5){
            }else{
                isValid=false;
                alert("Maximum Number of Points Exceeded");
            }
        }
        if (Speech=="IOS"){
            if(Points <=10){
            }else{
                isValid=false;
                alert("Maximum Number of Points Exceeded");
            }
        }
        if (Speech=="statements"){
            if(Points <=10){
            }else{
                isValid=false;
                alert("Maximum Number of Points Exceeded");
            }
        }
        if (Speech=="RS"){
            if(Points <=10){
            }else{
                isValid=false;
                alert("Maximum Number of Points Exceeded");
            }
        }
        if (Speech=="Amendments"){
            if(Points <=10){
            }else{
                isValid=false;
                alert("Maximum Number of Points Exceeded");
            }
        }
        return isValid;
    };
    $scope.getpayload=function(Points,Speech,Country) {
        var SpeakersList = 0;
        var ModeratedCaucusTopics = 0;
        var POIa = 0;
        var POIr = 0;
        var ForeignPolicyViolation = 0;
        var FactualError = 0;
        var InfringementOfSovereignty = 0;
        var Statements  = 0;
        var ResolutionSponsors = 0;
        var Ammendments  = 0;
        if (Speech=="SL"){
            SpeakersList=Points;
        }
        if (Speech=="ModCaucus"){
            ModeratedCaucusTopics=Points;
        }
        if (Speech=="POIa"){
            POIa=Points;
        }
        if (Speech=="POIr"){
            POIr=Points;
        }
        if (Speech=="FPV"){
            ForeignPolicyViolation=Points;
        }
        if (Speech=="FE"){
            FactualError=Points;
        }
        if (Speech=="IOS"){
            InfringementOfSovereignty=Points;
        }
        if (Speech=="statements"){
            Statements=Points;
        }
        if (Speech=="RS"){
            ResolutionSponsors=Points;
        }
        if (Speech=="Amendments"){
            Ammendments=Points;
        }
        var payload = {
            Country : Country,
            Speech : {
                SpeakersList  : SpeakersList,
                ModeratedCaucusTopics : ModeratedCaucusTopics,
                POIa  : POIa,
                POIr  : POIr,
                RTR  : {
                    ForeignPolicyViolation : ForeignPolicyViolation,
                    FactualError : FactualError,
                    InfringementOfSovereignty : InfringementOfSovereignty,
                },
                Statements  : Statements,
                ResolutionSponsors  : ResolutionSponsors,
                Amendments  : Ammendments,
            }
        };
        return payload;
    }
    $scope.insertData=function(payload,SelectedCountry,SelectSpeech) {
        $http({
            method: "PUT",
            url: $scope.insertDataurl + SelectSpeech + "/" + SelectedCountry,
            data: payload
        }).then(function mySuccess(response) {
            $scope.myWelcome = response.data;
            alert("Points Submitted")
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
            alert("There was an Error")
        });
    }
    $scope.getcountries=function(){
        $http({
            method : "GET",
            url : $scope.getcountryurl
        }).then(function mySuccess(response) {
            angular.forEach(response.data,function (record) {
                $scope.countries.push({
                    "id":record._id,
                    "country":record.Country
                })
            })
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    $scope.getcountries();
    $scope.ValidateForm=function(SelectedCountry,SelectSpeech,InsertedPoints) {
        if ($scope.checkValidity(InsertedPoints,SelectSpeech)){
            var payload = $scope.getpayload(InsertedPoints, SelectSpeech, SelectedCountry)
            $scope.insertData(payload, SelectedCountry, SelectSpeech);
        }
    }});