function numIdenticalPairs(nums) {
        let count = 0;
        let arr = [];
        for(let i=0 ; i<nums.length ; i++) {
            let num = nums[i];
            arr[num]++;
        }
        for(let i=0 ; i<100 ; i++) {
            if(arr[i]>1)
            count = count + arr[i];
        }
        return count;
}
let arr = [1,2,3,1,1,3];
console.log(numIdenticalPairs(arr))