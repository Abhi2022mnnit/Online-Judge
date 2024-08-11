#include <bits/stdc++.h>
using namespace std;
int main() {   
    int n; 
    cin>>n;
    vector<int> vec(n);    
    for(int i=0; i<n; i++){
        cin>>vec[i];
    }
    int sum = vec[0];     
    int ans = vec[0];          
    for(int i=1; i<n; i++){
        sum = max(sum+vec[i], vec[i]);
        ans = max(ans, sum);
    }     
    cout<<ans+6;
    return 0;
}