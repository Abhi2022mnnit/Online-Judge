#include<bits/stdc++.h>
using namespace std;

int getXORSum(vector<int>& arr1, vector<int>& arr2) {
    int arr1_xor = 0, arr2_xor = 0;

    for(int it : arr1){
        arr1_xor = (arr1_xor ^ it);
    }
    for(int it : arr2){
        arr2_xor = (arr2_xor ^ it); 
    }


    return arr1_xor & arr2_xor;
}

int main(){
    int n,m;
    cin>>n>>m;
    vector<int> arr1(n), arr2(m);
    for(int i=0; i<n; i++){
        cin>>arr1[i];
    }
    for(int i=0; i<m; i++){
        cin>>arr2[i];
    }

    cout<<getXORSum(arr1, arr2);
    return 0;
}