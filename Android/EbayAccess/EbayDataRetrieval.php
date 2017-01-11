<?php
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')	
{
	$call="";
	$response;
	$c=0;
	$l=0;
	$pms=0;
	$url="http://svcs.eBay.com/services/search/FindingService/v1?siteid=0&SECURITY-APPNAME=Universi-9b52-4bc2-b847-385688b5de53&OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=XML";
	if($_SERVER["REQUEST_METHOD"] == "GET")
	{
		$call.=$url;
		if(isset($_GET["keywords"]) and $_GET["keywords"]!='' and $_GET["keywords"] != 'notset')
		{
			$enc = urlencode(utf8_encode($_GET["keywords"]));
			$call.="&keywords=".$enc;
		}
		if(isset($_GET["Results"]) and $_GET["Results"]!='' and $_GET["Results"] != 'notset')
		{
			$call.="&paginationInput.entriesPerPage=".$_GET["Results"];					
		}
		if(isset($_GET["SortOrder"]) and $_GET["SortOrder"]!='' and $_GET["SortOrder"] != 'notset')
		{
			$call.="&sortOrder=".$_GET["SortOrder"];
		}
		if(isset($_GET["MinPrice"]) and $_GET["MinPrice"]!='' and $_GET["MinPrice"] != 'notset')
		{
			$call.="&itemFilter(".$pms.").name=MinPrice&itemFilter(".$pms.").value=".$_GET["MinPrice"];
			$pms++;
		}
		if(isset($_GET["MaxPrice"]) and $_GET["MaxPrice"]!='' and $_GET["MaxPrice"] != 'notset')
		{
			$call.="&itemFilter(".$pms.").name=MaxPrice&itemFilter(".$pms.").value=".$_GET["MaxPrice"];
			$pms++;
		}
		$numhand = $_GET["MaxHandlingTime"];
		if($numhand != "")
		{
			if(in_array($numhand,$_GET))
			{
				if(isset($_GET["MaxHandlingTime"]) and $_GET["MaxHandlingTime"]!='' and $_GET["MaxHandlingTime"] != 'notset')
				{
					$call.="&itemFilter(".$pms.").name=MaxHandlingTime&itemFilter(".$pms.").value=".$_GET["MaxHandlingTime"];
					$pms++;
				}
			}
		}
		if(in_array("1000",$_GET) || in_array("3000",$_GET) || in_array("4000",$_GET) || in_array("5000",$_GET) || in_array("6000",$_GET))
		{
			$condition="&itemFilter(".$pms.").name=Condition";
			$call.=$condition;	
			if(isset($_GET["New"]) and $_GET["New"]!='' and $_GET["New"] != 'notset')
			{
				$call.="&itemFilter(".$pms.").value(".$c.")=".$_GET["New"];
				$c++;
			}
			if(isset($_GET["Used"]) and $_GET["Used"]!='' and $_GET["Used"] != 'notset')
			{
				$call.="&itemFilter(".$pms.").value(".$c.")=".$_GET["Used"];
				$c++;					
			}
			if(isset($_GET["Very_Good"]) and $_GET["Very_Good"]!='' and $_GET["Very_Good"] != 'notset')
			{
				$call.="&itemFilter(".$pms.").value(".$c.")=".$_GET["Very_Good"];
				$c++;					
			}
			if(isset($_GET["Good"]) and $_GET["Good"]!='' and $_GET["Good"] != 'notset')
			{
				$call.="&itemFilter(".$pms.").value(".$c.")=".$_GET["Good"];
				$c++;					
			}
			if(isset($_GET["Acceptable"]) and $_GET["Acceptable"]!='' and $_GET["Acceptable"] != 'notset')
			{
				$call.="&itemFilter(".$pms.").value(".$c.")=".$_GET["Acceptable"];					
			}
			$pms++;
		}
		if( in_array("FixedPrice",$_GET) || in_array("Auction",$_GET) || in_array("Classified",$_GET))
		{		
			$listing="&itemFilter(".$pms.").name=ListingType";			
			$call.=$listing;
			if(isset($_GET["ListingType_1"]) and $_GET["ListingType_1"]!='' and $_GET["ListingType_1"] != 'notset')
			{
				$call.="&itemFilter(".$pms.").value(".$l.")=".$_GET["ListingType_1"];
				$l++;					
			}
			if(isset($_GET["ListingType_2"]) and $_GET["ListingType_2"]!='' and $_GET["ListingType_2"] != 'notset')
			{
				$call.="&itemFilter(".$pms.").value(".$l.")=".$_GET["ListingType_2"];
				$l++;					
			}
			if(isset($_GET["ListingType_3"]) and $_GET["ListingType_3"]!='' and $_GET["ListingType_3"] != 'notset')
			{
				$call.="&itemFilter(".$pms.").value(".$l.")=".$_GET["ListingType_3"];					
			}
			$pms++;
		}
		if(in_array("ReturnsAcceptedOnly",$_GET))
		{		
			if(isset($_GET["ReturnsAcceptedOnly"]) and $_GET["ReturnsAcceptedOnly"]!='' and $_GET["ReturnsAcceptedOnly"] != 'notset')
			{
				$call.="&itemFilter(".$pms.").name=ReturnsAcceptedOnly&itemFilter(".$pms.").value=true";
				$pms++;
			}
		}	
		if(in_array("FreeShippingOnly",$_GET))
		{
			if(isset($_GET["FreeShippingOnly"]) and $_GET["FreeShippingOnly"]!='' and $_GET["FreeShippingOnly"] != 'notset')
			{
				$call.="&itemFilter(".$pms.").name=FreeShippingOnly&itemFilter(".$pms.").value=true";
				$pms++;
			}
		}
		if(in_array("Expedited",$_GET))
		{
			if(isset($_GET["ExpeditedShippingAvailable"]) and $_GET["ExpeditedShippingAvailable"]!='' and $_GET["ExpeditedShippingAvailable"] != 'notset')
			{
				$call.="&itemFilter(".$pms.").name=ExpeditedShippingType&itemFilter(".$pms.").value=Expedited";
				$pms++;
			}
		}	
		$call.="&outputSelector[".$pms."]=SellerInfo";
		$pms++;
		$call.="&outputSelector[".$pms."]=PictureURLSuperSize";
		$pms++;
		$call.="&outputSelector[".$pms."]=StoreInfo";
		if(isset($_GET["pageNumber"]) and $_GET["pageNumber"]!='' and $_GET["pageNumber"] != 'notset')
		{
			$pgno = $_GET["pageNumber"];
			$call.="&paginationInput.pageNumber=".$pgno;
		}
		$response = simplexml_load_file($call);
		//$responseContent = file_get_contents($call);
		//echo $call;
		$entries=$response->paginationOutput->totalEntries;
		$counter=$response->paginationOutput->entriesPerPage;
		$result;
		$items;
		if($entries == 0)
		{
			$result["ack"] = "No results found";
		}
		else
		{
			$result["ack"] = (string)$response->ack;
			$result["resultCount"] = (int)$response->paginationOutput->totalEntries;
			$result["pageNumber"] = (int)$response->paginationOutput->pageNumber;
			$result["itemCount"] = (int)$response->paginationOutput->entriesPerPage;
			$cnt;
			if($entries-$counter < 0)
			{
				$cnt = $entries;
			}
			if($entries-$counter > 0)
			{
				$cnt = $counter;
			}
			for($x=0;$x<$cnt;$x++)
			{
				$basicInfo;
				$basicInfo["title"] = (string)$response->searchResult->item[$x]->title;
				$basicInfo["viewitemURL"] = (string)$response->searchResult->item[$x]->viewItemURL;
				$basicInfo["galleryURL"] = (string)$response->searchResult->item[$x]->galleryURL;
				$basicInfo["pictureURLSuperSize"] = (string)$response->searchResult->item[$x]->pictureURLSuperSize;
				$basicInfo["convertedCurrentPrice"] = (float)$response->searchResult->item[$x]->sellingStatus->convertedCurrentPrice;
				$basicInfo["shippingServiceCost"] = (float)$response->searchResult->item[$x]->shippingInfo->shippingServiceCost;
				$basicInfo["conditionDisplayName"] = (string)$response->searchResult->item[$x]->condition->conditionDisplayName;
				$basicInfo["listingType"] = (string)$response->searchResult->item[$x]->listingInfo->listingType;
				$basicInfo["location"] = (string)$response->searchResult->item[$x]->location;
				$basicInfo["categoryName"] = (string)$response->searchResult->item[$x]->primaryCategory->categoryName;
				$basicInfo["topRatedListing"] = (string)$response->searchResult->item[$x]->topRatedListing;
				
				$sellerInfo;
				$sellerInfo["sellerUserName"] = (string)$response->searchResult->item[$x]->sellerInfo->sellerUserName;
				$sellerInfo["feedbackScore"] = (float)$response->searchResult->item[$x]->sellerInfo->feedbackScore;
				$sellerInfo["positiveFeedbackPercent"] = (float)$response->searchResult->item[$x]->sellerInfo->positiveFeedbackPercent;
				$sellerInfo["feedbackRatingStar"] = (string)$response->searchResult->item[$x]->sellerInfo->feedbackRatingStar;
				$sellerInfo["topRatedSeller"] = (string)$response->searchResult->item[$x]->sellerInfo->topRatedSeller;
				$sellerInfo["sellerStoreName"] = (string)$response->searchResult->item[$x]->storeInfo->storeName;
				$sellerInfo["sellerStoreURL"] = (string)$response->searchResult->item[$x]->storeInfo->storeURL;
				
				$shippingInfo;
				$shippingInfo["shippingType"] = (string)$response->searchResult->item[$x]->shippingInfo->shippingType;
				if(count((array)$response->searchResult->item[$x]->shippingInfo->shipToLocations) > 1)
				{
					$shippingInfo["shipToLocations"] = (array)$response->searchResult->item[$x]->shippingInfo->shipToLocations;
				}
				else if(count((array)$response->searchResult->item[$x]->shippingInfo->shipToLocations) == 1)
				{
					$shippingInfo["shipToLocations"] = (string)$response->searchResult->item[$x]->shippingInfo->shipToLocations;
				}
				$shippingInfo["expeditedShipping"] = (string)$response->searchResult->item[$x]->shippingInfo->expeditedShipping;
				$shippingInfo["oneDayShippingAvailable"] = (string)$response->searchResult->item[$x]->shippingInfo->oneDayShippingAvailable;
				$shippingInfo["returnsAccepted"] = (string)$response->searchResult->item[$x]->returnsAccepted;
				$shippingInfo["handlingTime"] = (int)$response->searchResult->item[$x]->shippingInfo->handlingTime;
				
				$itemdetails["basicInfo"]=$basicInfo; 
				$itemdetails["sellerInfo"]=$sellerInfo;
				$itemdetails["shippingInfo"]=$shippingInfo;
				
				$result["item".$x]=$itemdetails;
			}
		}
		$rsltjson = json_encode($result,JSON_UNESCAPED_SLASHES);
		echo $rsltjson;
	}
}
?>