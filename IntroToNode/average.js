function average(arr){
    var total = 0;
    for(var i = 0; i < arr.length; i ++){
        total+=arr[i];
    }
    total /= Math.round(arr.length);
    console.log(total);
}
average([-5,5,10,30,20,12,130])