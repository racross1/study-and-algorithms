// Given a string s, find the length of the longest substring without repeating characters.

// Example 1:

// Input: 
const s1 = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:

// Input: 
const s2 = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: 
const s3 = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
// Example 4:

// Input: 
const s4 = ""
// Output: 0

// Input:
const s5 = "au"
//output: 2


const s6 = "aaca"
//output: 2

const s7 = "dvdf"
//output: 3



/**
 * @param {string} s
 * @return {number}
 */



//this is the one I understand best - notes on implementation below. I implemented with posIndex renamed to currIdxMaxStr
//result appears to be slow relative to other submissions but it's the one that's easiest for me to understand.


//LENGTH OF LONGEST SUBSTRING
//initialize maxlength, maxstr, tempStr, and index

//loop through string starting at 0. 
//assign temp string to char at index of i
//assign posIndex var to index of tempstr in max str
//check posIndex is not -1, that means you've found that letter in the current max string
//with this you want to start a new maxstr starting at the index in maxstr after your current pos index

//after that add temp str to max str
//then maxLen = Math.max(maxLen, maxStr.length)

//after loop is complete return maxLen

 var lengthOfLongestSubstring1 = function(s) {
    console.log('original str: ', s)
    var sLen = s.length,
      maxLen = 0,
      maxStr = '',
      tmpStr,
      posIndex,
      i;
  
    for( i = 0 ; i < sLen; i++ ){
  
    //temp string = s at current index
      tmpStr = s[i];
      console.log('tempStr: ', tmpStr)
    //posIndex = index of temp string character (i.e. index at current value in for loop) in maxStr (initially initialized to 0)
      posIndex = maxStr.indexOf(tmpStr);
      console.log('posIndex: ', posIndex)
  
      //if posIndex is not -1, that means you've found that letter in the current max string
      if(posIndex > -1){
          //with this you want to start the new max string at the letter after the initial occurrence of the current letter (which is a repeated letter)
        maxStr = maxStr.substring(posIndex + 1);
        console.log('maxStr.substring(posIndex + 1): ', maxStr)
      }
  
      
      maxStr += tmpStr;
      console.log('maxStr after addition of tempStr: ', maxStr)
      maxLen = Math.max(maxLen, maxStr.length);
    }
  
    return maxLen;
  };

//  The idea behind this code is to use hash maps to keep track of seen substrings.
//  Obviously if any string is less than two, the longest substring is equal to the length of that substring.
//  However, if not, then we would have to consider another approach.
 
//  Consider a string:
//  _ _ _ _ _ a _ _ _ _ _ f _ _ _ f _ _ _ a
 
//  Where _ means a distinct character from all the others.
 
//  As we transverse the string, we put a character into the hash table if it's not already in there where the key is the character and the value is the index. --> hash = {char: index}
 
//  If there character is already in the string, we have to update the index after we do the following procedures:
 
//  We have a curr that keeps track of the length of the substring that has not seen an already seen character. 
//As we get to the second f, curr = 16. So, so far the max_len is going to be max(max_len = 0, curr = 16) [Since max_len has yet to be updated].
 
//  Now, we start our curr from the character after the first f. curr now becomes the distance between the first f and the second f, which is i - hash[s[i]]. We update the hash and continue.
 
//  The max_len is determined by the max of the current max_len and the curr value when it encounters a character already seen.
 
//  Finally, we have completely transversed the string and arrived at the max length of the substring that does not have any repeating characters.
 
//  Runtime: O(n)
//  Space Complexity: O(n)
 
 


 var lengthOfLongestSubstring2 = function(s) {
     let max_len = 0;
     let curr = 0;
     let hash = {}; 
     if(s.length < 2) {
         return s.length;
     }
     for(let i = 0; i < s.length;  i++) {
         if(hash[s[i]] == null) {
            
            curr += 1;
         } else {
            console.log(hash) 
            console.log('i: ', i)
             console.log('hash: ', hash)
             console.log('hash[s[i]]: ', hash[s[i]])
             console.log('curr: ', curr)
             curr = Math.min(i - hash[s[i]], curr + 1);
         }
         max_len = Math.max(max_len, curr);
         hash[s[i]] = i; //save the index
     }
     return max_len;
 };


//a version using reduce that I don't immediatly understand
'https://leetcode.com/explore/interview/card/amazon/76/array-and-strings/2961/discuss/2291/9-line-JavaScript-solution'
const lengthOfLongestSubstring3 = s => {
    // keeps track of the most recent index of each letter.
    const map = {};
    // keeps track of the starting index of the current substring.
    var left = 0;
    
    return s.split('').reduce((max, v, i) => {
        // starting index of substring is 1 + (the last index of this letter) to ensure this letter is not counted twice.
        left = map[v] >= left ? map[v] + 1 : left;
        // updates last recorded index of letter to the most recent index.
        map[v] = i;
        
        // indices of current substring is (idx - leftIdx, idx).
        // +1 because if your substring starts and ends at index 0, it still has a length of 1.
        return Math.max(max, i - left + 1);
    }, 0)
};



//mine (did not work)
//  var lengthOfLongestSubstring = function(s) {
//      if (s === '') return 0

//      let currentLongest = s[0]
//      let startOfCurrent = 0
//      let currentStr = s[0]

//      for (let i = 1; i < s.length; i++){
//          if (currentStr.includes(s[i])) {
//              s.indexOf(s[i]) + 1 < i ? startOfCurrent = s.indexOf(s[i]) + 1 : startOfCurrent = i
//              currentStr = s.slice(startOfCurrent, i)
//             // console.log(`i: ${i} s[i]: ${s[i]}`) 
//             // console.log(`str: ${currentStr} longest: ${currentLongest}`)
//             if (currentStr.length > currentLongest.length){
//                 currentLongest = currentStr
//                 startOfCurrent = i
//                 currentStr = s[i]
    
//         } else {
//             startOfCurrent = i
//             currentStr = s[i]
//         }

        

//         } else {
//         currentStr += s[i]
//         }
   
//     }

//     console.log(`currentStr: ${currentStr} currentLongest: ${currentLongest}`)
//     return currentStr.length > currentLongest.length ? currentStr.length : currentLongest.length
// }


// console.log(lengthOfLongestSubstring(s1))
// console.log(lengthOfLongestSubstring(s2))
// console.log(lengthOfLongestSubstring(s3))
// console.log(lengthOfLongestSubstring(s4))
// console.log(lengthOfLongestSubstring(s5))
// console.log(lengthOfLongestSubstring(s6))
console.log(lengthOfLongestSubstring1(s7))

